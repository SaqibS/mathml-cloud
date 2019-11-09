import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const convert: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Convert function processed a request.');

    var format = req.query.format;
    if (!format) {
        context.res = {
            status: 400,
            body: "Missing required parameter: 'format'"
        };
        return;
    }

    format = format.toLowerCase();
    if (format != "mathml" && format != "asciimath" && format != "latex") {
        context.res = {
            status: 400,
            body: "Unsupported format '" + format + "'"
        };
        return;
    }

    context.res = {
        body: "Converting from " + req.query.format
    };
};

export default convert;
