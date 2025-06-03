'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function getTagFilesMap(app) {
    const metadataCache = app.metadataCache;
    const markdownFiles = app.vault.getMarkdownFiles();
    const tagFilesMap = {};
    for (const markdownFile of markdownFiles) {
        const cachedMetadata = metadataCache.getFileCache(markdownFile);
        if (cachedMetadata) {
            const cachedTags = getCachedTags(cachedMetadata);
            if (cachedTags.length) {
                for (const cachedTag of cachedTags) {
                    if (tagFilesMap[cachedTag]) {
                        tagFilesMap[cachedTag].push(markdownFile);
                    }
                    else {
                        tagFilesMap[cachedTag] = [markdownFile];
                    }
                }
            }
        }
    }
    return tagFilesMap;
}
function getCachedTags(cachedMetadata) {
    var _a, _b;
    const bodyTags = ((_a = cachedMetadata.tags) === null || _a === void 0 ? void 0 : _a.map((x) => x.tag)) || [];
    const frontMatterTags = ((_b = cachedMetadata.frontmatter) === null || _b === void 0 ? void 0 : _b.tags) || [];
    // frontmatter tags might not have a hashtag in front of them
    const cachedTags = bodyTags.concat(frontMatterTags).map((x) => (x.startsWith('#') ? x : '#' + x));
    return cachedTags;
}
function randomElement(array) {
    return array[(array.length * Math.random()) << 0];
}

class SmartRandomNoteSettingTab extends obsidian.PluginSettingTab {
    constructor(plugin) {
        super(plugin.app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Smart Random Note Settings ' });
        new obsidian.Setting(containerEl)
            .setName('Open in New Leaf')
            .setDesc('Default setting for opening random notes')
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.openInNewLeaf);
            toggle.onChange(this.plugin.setOpenInNewLeaf);
        });
        new obsidian.Setting(containerEl)
            .setName('Enable Ribbon Icon')
            .setDesc('Place an icon on the ribbon to open a random note from search')
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.enableRibbonIcon);
            toggle.onChange(this.plugin.setEnableRibbonIcon);
        });
    }
}

class SmartRandomNoteNotice extends obsidian.Notice {
    constructor(message, timeout) {
        super('Smart Random Note: ' + message, timeout);
    }
}

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached
    const children = target.childNodes;
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        const seqLen = upper_bound(1, longest + 1, idx => children[m[idx]].claim_order, current) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        if (node !== target.actual_end_child) {
            target.insertBefore(node, target.actual_end_child);
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append(target, node);
    }
    else if (node.parentNode !== target || (anchor && node.nextSibling !== anchor)) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

/* src/OpenRandomTaggedNoteModalView.svelte generated by Svelte v3.38.3 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	return child_ctx;
}

// (13:8) {#each tags as tag}
function create_each_block(ctx) {
	let option;
	let t_value = /*tag*/ ctx[5] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = /*tag*/ ctx[5];
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*tags*/ 1 && t_value !== (t_value = /*tag*/ ctx[5] + "")) set_data(t, t_value);

			if (dirty & /*tags*/ 1 && option_value_value !== (option_value_value = /*tag*/ ctx[5])) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

function create_fragment(ctx) {
	let h3;
	let t1;
	let form;
	let select;
	let t2;
	let button;
	let mounted;
	let dispose;
	let each_value = /*tags*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			h3 = element("h3");
			h3.textContent = "Select Tag";
			t1 = space();
			form = element("form");
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			button = element("button");
			button.textContent = "Submit";
			attr(select, "class", "dropdown");
			if (/*selectedTag*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[4].call(select));
			attr(button, "class", "mod-cta");
			attr(button, "type", "submit");
		},
		m(target, anchor) {
			insert(target, h3, anchor);
			insert(target, t1, anchor);
			insert(target, form, anchor);
			append(form, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*selectedTag*/ ctx[1]);
			append(form, t2);
			append(form, button);

			if (!mounted) {
				dispose = [
					listen(select, "change", /*select_change_handler*/ ctx[4]),
					listen(form, "submit", prevent_default(/*handleFormSubmit*/ ctx[2]))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*tags*/ 1) {
				each_value = /*tags*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*selectedTag, tags*/ 3) {
				select_option(select, /*selectedTag*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(h3);
			if (detaching) detach(t1);
			if (detaching) detach(form);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { tags } = $$props;
	let { handleSubmit } = $$props;

	const handleFormSubmit = () => {
		handleSubmit(selectedTag);
	};

	let selectedTag;

	function select_change_handler() {
		selectedTag = select_value(this);
		$$invalidate(1, selectedTag);
		$$invalidate(0, tags);
	}

	$$self.$$set = $$props => {
		if ("tags" in $$props) $$invalidate(0, tags = $$props.tags);
		if ("handleSubmit" in $$props) $$invalidate(3, handleSubmit = $$props.handleSubmit);
	};

	return [tags, selectedTag, handleFormSubmit, handleSubmit, select_change_handler];
}

class OpenRandomTaggedNoteModalView extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { tags: 0, handleSubmit: 3 });
	}
}

class OpenRandomTaggedNoteModal extends obsidian.Modal {
    constructor(app, tags) {
        super(app);
        this.submitCallback = undefined;
        this.handleSubmit = (tag) => {
            if (this.submitCallback) {
                this.submitCallback(tag);
            }
            this.close();
        };
        this.tags = tags;
        this.view = new OpenRandomTaggedNoteModalView({
            target: this.contentEl,
            props: { tags, handleSubmit: this.handleSubmit },
        });
    }
}

class SmartRandomNotePlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.settings = { openInNewLeaf: true, enableRibbonIcon: true };
        this.ribbonIconEl = undefined;
        this.onunload = () => {
            console.log('unloading smart-random-note');
        };
        this.handleOpenRandomNote = () => __awaiter(this, void 0, void 0, function* () {
            const markdownFiles = this.app.vault.getMarkdownFiles();
            this.openRandomNote(markdownFiles);
        });
        this.handleOpenTaggedRandomNote = () => {
            const tagFilesMap = getTagFilesMap(this.app);
            const tags = Object.keys(tagFilesMap);
            const modal = new OpenRandomTaggedNoteModal(this.app, tags);
            modal.submitCallback = (selectedTag) => __awaiter(this, void 0, void 0, function* () {
                const taggedFiles = tagFilesMap[selectedTag];
                yield this.openRandomNote(taggedFiles);
            });
            modal.open();
        };
        this.handleOpenRandomNoteFromSearch = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const searchView = (_a = this.app.workspace.getLeavesOfType('search')[0]) === null || _a === void 0 ? void 0 : _a.view;
            if (!searchView) {
                new SmartRandomNoteNotice('The core search plugin is not enabled', 5000);
                return;
            }
            const searchResults = searchView.dom.getFiles();
            if (!searchResults.length) {
                new SmartRandomNoteNotice('No search results available', 5000);
                return;
            }
            yield this.openRandomNote(searchResults);
        });
        this.handleInsertLinkFromSearch = () => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const searchView = (_b = this.app.workspace.getLeavesOfType('search')[0]) === null || _b === void 0 ? void 0 : _b.view;
            if (!searchView) {
                new SmartRandomNoteNotice('The core search plugin is not enabled', 5000);
                return;
            }
            const searchResults = searchView.dom.getFiles();
            if (!searchResults.length) {
                new SmartRandomNoteNotice('No search results available', 5000);
                return;
            }
            yield this.insertRandomLinkAtCursor(searchResults);
        });
        this.openRandomNote = (files) => __awaiter(this, void 0, void 0, function* () {
            const markdownFiles = files.filter((file) => file.extension === 'md');
            if (!markdownFiles.length) {
                new SmartRandomNoteNotice("Can't open note. No markdown files available to open.", 5000);
                return;
            }
            const fileToOpen = randomElement(markdownFiles);
            yield this.app.workspace.openLinkText(fileToOpen.basename, '', this.settings.openInNewLeaf, {
                active: true,
            });
        });
        this.insertRandomLinkAtCursor = (files) => __awaiter(this, void 0, void 0, function* () {
            const fileToLink = randomElement(files);
            const activeLeaf = this.app.workspace.activeLeaf;
            if (!activeLeaf) {
                new SmartRandomNoteNotice("Can't insert link. No active note to insert link into", 5000);
                return;
            }
            const viewState = activeLeaf.getViewState();
            const canEdit = viewState.type === 'markdown' && viewState.state && viewState.state.mode == 'source';
            if (!canEdit) {
                new SmartRandomNoteNotice("Can't insert link. The active file is not a markdown file in edit mode.", 5000);
                return;
            }
            const markdownView = activeLeaf.view;
            const cursorPos = markdownView.editor.getCursor();
            const textToInsert = `[[${fileToLink.name}]]`;
            markdownView.editor.replaceRange(textToInsert, cursorPos);
        });
        this.loadSettings = () => __awaiter(this, void 0, void 0, function* () {
            const loadedSettings = (yield this.loadData());
            if (loadedSettings) {
                this.setOpenInNewLeaf(loadedSettings.openInNewLeaf);
                this.setEnableRibbonIcon(loadedSettings.enableRibbonIcon);
            }
            else {
                this.refreshRibbonIcon();
            }
        });
        this.setOpenInNewLeaf = (value) => {
            this.settings.openInNewLeaf = value;
            this.saveData(this.settings);
        };
        this.setEnableRibbonIcon = (value) => {
            this.settings.enableRibbonIcon = value;
            this.refreshRibbonIcon();
            this.saveData(this.settings);
        };
        this.refreshRibbonIcon = () => {
            var _a;
            (_a = this.ribbonIconEl) === null || _a === void 0 ? void 0 : _a.remove();
            if (this.settings.enableRibbonIcon) {
                this.ribbonIconEl = this.addRibbonIcon('dice', 'Open Random Note from Search', this.handleOpenRandomNoteFromSearch);
            }
        };
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loading smart-random-note');
            yield this.loadSettings();
            this.addSettingTab(new SmartRandomNoteSettingTab(this));
            this.addCommand({
                id: 'open-random-note',
                name: 'Open Random Note',
                callback: this.handleOpenRandomNote,
            });
            this.addCommand({
                id: 'open-tagged-random-note',
                name: 'Open Tagged Random Note',
                callback: this.handleOpenTaggedRandomNote,
            });
            this.addCommand({
                id: 'open-random-note-from-search',
                name: 'Open Random Note from Search',
                callback: this.handleOpenRandomNoteFromSearch,
            });
            this.addCommand({
                id: 'insert-link-to-random-note-at-cursor',
                name: 'Insert Link at Cursor to Random Note from Search',
                callback: this.handleInsertLinkFromSearch,
            });
        });
    }
}

module.exports = SmartRandomNotePlugin;


/* nosourcemap */