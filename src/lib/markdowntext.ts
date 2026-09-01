import { marked, Renderer, type MarkedOptions, type Tokens } from "marked";
import { unescape } from "lodash";
import lodashEscape from "lodash.escape";

const block = (text: string) => text + "\n\n";
const escapeBlock = (text: string) => lodashEscape(text) + "\n\n";
const line = (text: string) => text + "\n";
const inline = (text: string) => text;
const newline = () => "\n";

// Create a custom renderer that converts markdown to plain text
const txtRenderer = new Renderer();
txtRenderer.code = ({ text }: Tokens.Code) => escapeBlock(text);
txtRenderer.blockquote = ({ text }: Tokens.Blockquote) => block(text);
txtRenderer.html = () => "";
txtRenderer.heading = ({ text }: Tokens.Heading) => block(text);
txtRenderer.hr = () => newline();
txtRenderer.list = (token: Tokens.List) => {
	const items = token.items.map(item => txtRenderer.listitem(item)).join("");
	return block(items.trim());
};
txtRenderer.listitem = (item: Tokens.ListItem) => line(item.text);
txtRenderer.checkbox = () => "";
txtRenderer.paragraph = ({ text }: Tokens.Paragraph) => block(text);
txtRenderer.table = (token: Tokens.Table) => {
	const headerText = token.header.map(cell => cell.text).join(" ");
	const rowsText = token.rows.map(row => row.map(cell => cell.text).join(" ")).join("\n");
	return line(headerText + "\n" + rowsText);
};
txtRenderer.tablerow = ({ text }: Tokens.TableRow) => line(text.trim());
txtRenderer.tablecell = (token: Tokens.TableCell) => token.text + " ";
txtRenderer.strong = ({ text }: Tokens.Strong) => inline(text);
txtRenderer.em = ({ text }: Tokens.Em) => inline(text);
txtRenderer.codespan = ({ text }: Tokens.Codespan) => inline(text);
txtRenderer.br = () => newline();
txtRenderer.del = ({ text }: Tokens.Del) => inline(text);
txtRenderer.link = ({ text }: Tokens.Link) => text;
txtRenderer.image = ({ text }: Tokens.Image) => text;
txtRenderer.text = ({ text }: Tokens.Text) => inline(text);

/**
 * Converts markdown to plaintext using the marked Markdown library.
 * Accepts [MarkedOptions](https://marked.js.org/using_advanced#options) as
 * the second argument.
 *
 * NOTE: The output of markdownToTxt is NOT sanitized. The output may contain
 * valid HTML, JavaScript, etc. Be sure to sanitize if the output is intended
 * for web use.
 *
 * @param markdown the markdown text to txtify
 * @param options  the marked options
 * @returns the unmarked text
 */
export function markdownToTxt(
	markdown: string,
	options?: MarkedOptions
): string {
	const unmarked = marked(markdown, { ...options, renderer: txtRenderer, async: false }) as string;
	const unescaped = unescape(unmarked);
	const trimmed = unescaped.trim();
	return trimmed;
}

export default markdownToTxt;
