import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
    clientId: string,
    slotId: String
}

const defaultOptions: Options = {
    clientId: "ca-pub-1829817529831781",
    slotId: "7543380157"
}

export default ((opts: Options) => {
    const Adsense: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
        return (
            <div>
                <script 
                    async 
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${opts.clientId}`}
                    crossorigin="anonymous">
                </script>
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client={`${opts.clientId}`}
                    data-ad-slot={`${opts.slotId}`}
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