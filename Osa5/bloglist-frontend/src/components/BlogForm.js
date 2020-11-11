import React from 'react'


const BlogForm = (props) => { 
    return (
        <><h2>Add a new blog</h2>
          <form onSubmit={props.handleCreate}>
            <div>
              Title
              <input
                type="text"
                value={props.newTitle}
                name="Title"
                onChange={props.handleTitle}
              />
            </div>
            <div>
              Author
              <input
                type="text"
                value={props.newAuthor}
                name="Author"
                onChange={props.handleAuthor}
              />
            </div>
            <div>
              Url
              <input
                type="text"
                value={props.newUrl}
                name="Url"
                onChange={props.handleUrl}
              />
            </div>
            <div>
              Likes
              <input
                type="number"
                value={props.newLikes}
                name="Likes"
                onChange={props.handleLikes}
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </>
    )
}
export default BlogForm
