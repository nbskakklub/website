import xml.etree.ElementTree as ET
from datetime import datetime

tree = ET.parse("nrrebroskakklub.WordPress.2023-12-02.xml")
root = tree.getroot()

for item in root.findall(".//item"):
    title = item.find("title").text.replace(":", "")
    date_str = item.find("pubDate").text
    author = item.find(
        ".//dc:creator", namespaces={"dc": "http://purl.org/dc/elements/1.1/"}
    ).text
    try:
        content = item.find(
            ".//content:encoded",
            namespaces={"content": "http://purl.org/rss/1.0/modules/content/"},
        ).text.replace("class", "className")
    except AttributeError:
        content = ""

    try:
        date = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %z")
        formatted_date = date.strftime("%Y-%m-%d")
    except TypeError:
        date = datetime(2000, 1, 1)
        formatted_date = date.strftime("%Y-%m-%d")

    tags = [
        category.text.lower().replace(" ", "-")
        for category in item.findall('.//category[@domain="category"]')
    ]

    slug = item.find("link").text.split("/")[-2]

    print("-------------------")
    print("Title: " + title)
    print("Author: " + author)
    print("Tags: " + " ".join(tags))
    print("Post name: " + slug)
    print("Date: " + formatted_date)

    md_filename = f"{slug}.mdx"
    md_path = "content/posts" + md_filename

    with open(md_path, "w", encoding="utf-8") as md_file:
        md_file.write(f"---\n")
        md_file.write(f"slug: {slug}\n")
        md_file.write(f"title: {title}\n")
        md_file.write(f"date: {formatted_date}\n")
        md_file.write(f"author: kimsecher\n")
        md_file.write(f"tags:\n")
        for tag in tags:
            md_file.write(f"  - {tag}\n")
        md_file.write(f"---\n")
        md_file.write(f"{content}\n")