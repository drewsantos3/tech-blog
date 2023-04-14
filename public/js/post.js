const newFormHandler = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector("#comment-body").value.trim();
  
    if (body) {
      const id = event.target.getAttribute("data-id");
      console.log(id);
      const response = await fetch(`/api/post/${id}`, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        alert("comment added!");
        document.location.reload();
      } else {
        alert("Failed to add comment");
      }
    }
  };
  
  
  
  const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#post-name").value.trim();
    const body = document.querySelector("#post-body").value.trim();
  
    if (title && body) {
      const id = event.target.getAttribute("data-id");
      const response = await fetch(`/api/post/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // document.location.replace(`/post/${id}`);
        document.location.reload();
      } else {
        alert("Failed to update post");
      }
    }
  };

  function revealCommentForm() {
    document.querySelector(".new-comment-form").classList.remove("hidden");
  }
  
  function revealUpdateForm() {
    document.querySelector(".update-post-form").classList.remove("hidden");
  }
  
  
  
  document.querySelector(".new-comment-form").addEventListener("click", newFormHandler);
  document.querySelector(".reveal-btn").addEventListener("click", revealCommentForm);
  
  
  document.querySelector(".update-post-form").addEventListener("click", updateFormHandler);
  