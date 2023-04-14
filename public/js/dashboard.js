const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#post-title").value.trim();
    const body = document.querySelector("#post-body").value.trim();
  
    if (title && body) {
      const response = await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create post");
      }
    }
  };
  
  const deletePostHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      const response = await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post");
      }
    }
  };
  
  function revealForm() {
    document.querySelector(".new-post-form").classList.remove("hidden");
  }
  
  document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
  document.querySelector(".post-list").addEventListener("click", deletePostHandler);
  document.querySelector(".reveal").addEventListener("click", revealForm);
