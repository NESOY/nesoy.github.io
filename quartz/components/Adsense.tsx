import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
    client: string
}

const defaultOptions: Options = {
    client: "ca-pub-1829817529831781",
}

export default ((opts: Options) => {
    const Adsense: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
        return (
            <div>
                <script 
                    async 
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${opts.client}`}
                    crossorigin="anonymous">
                </script>
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client={`${opts.client}`}
                    data-ad-slot="7543380157"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        )
    }

    return Adsense
}) satisfies QuartzComponentConstructor<Options>