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
            <script 
                async 
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${opts.client}`}
                crossOrigin="anonymous"
            ></script>
        )
    }

    return Adsense
}) satisfies QuartzComponentConstructor<Options>