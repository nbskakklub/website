import frontmatter
from os import walk


def extract_tags_from_md(md_file_path):
    with open(md_file_path, 'r', encoding='utf-8') as file:
        # Parse the front matter of the Markdown file
        post = frontmatter.load(file)

        # Check if 'tags' key exists in front matter
        if 'tags' in post.keys():
            tags = post['tags']
            return tags
        else:
            return None
        
def loadMdFile(md_file_path):
    with open(md_file_path, 'r', encoding='utf-8') as file:
        # Parse the front matter of the Markdown file
        post = frontmatter.load(file)
        return post
    
def saveMdFile(post, md_file_path):
    with open(md_file_path, 'w', encoding='utf-8') as file:
        # Save the modified front matter back to the Markdown file
        file.write(frontmatter.dumps(post))

def add_tag_and_save(md_file_path, new_tag):
    with open(md_file_path, 'r', encoding='utf-8') as file:
        # Parse the front matter of the Markdown file
        post = frontmatter.load(file)

        # Add a new tag
        if 'tags' in post.keys():
            post['tags'].append(new_tag)
        else:
            post['tags'] = [new_tag]

    with open(md_file_path, 'w', encoding='utf-8') as file:
        # Save the modified front matter back to the Markdown file
        file.write(frontmatter.dumps(post))
       

# Replace 'your_md_file.md' with the actual path to your Markdown file

filenames = next(walk('content/posts'), (None, None, []))[2]  # [] if no file

print(filenames)

for fname in filenames:
    
    filename = 'content/posts/' + fname 

    tags_before = extract_tags_from_md(filename)
    print("Tags before:", tags_before)

    # Add a new tag and save the file

    post = loadMdFile(filename)
    
    if('seneste-nyt' in post['tags']):

        post['tags'] = list(filter(lambda a: a != "seneste-nyt", post['tags']))

        saveMdFile(post, filename)
        # add_tag_and_save(md_file_path, new_tag)

        tags_after = extract_tags_from_md(filename)
        print("Tags after: {}".format(tags_after))
    


