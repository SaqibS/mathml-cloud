import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import mathjax = require("mathjax-node-sre");

const convert: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Convert function processed a request.');

    const format = req.query.format;
    if (!format) {
        context.res = {
            status: 400,
            body: "Missing required parameter: 'format'"
        };
        return;
    }

    if (format != "MathML" && format != "AsciiMath" && format != "TeX") {
        context.res = {
            status: 400,
            body: "Unsupported format '" + format + "'"
        };
        return;
    }

    var result = await mathjax.typeset({
        math: req.body,
        format: format,
        mml: true,
        svg: true
    });

    context.res = {
        body: result.mml
    };
};

export default convert;

