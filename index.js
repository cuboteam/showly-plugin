// DeepSeek Harness loads this module because package.json names it as main.
// The MCP server itself is declared in cordis.patch.yml; this module only
// satisfies the bundle contract (a name plus apply). It must not read or log
// credentials — DSH has no login writer here, and the endpoint is OAuth.
export const name = "showly";

export function apply() {}
