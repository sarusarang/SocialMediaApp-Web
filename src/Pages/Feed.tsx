import PostCard from "@/components/Post/PostCard"
import VideoCard from "@/components/Post/VideoCard";


export default function Feed() {


  // Sample post data
  const samplePosts = [
    {
      author: {
        username: "jane_doe",
        displayName: "Jane Doe",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      content: "Watching the sunset at the beach is my favorite way to end the day. The colors were magnificent!",
      video: "/Video.mp4",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      comments: 12,
      likes: 42
    },
    {
      author: {
        username: "john_smith",
        displayName: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=8"
      },
      content: "Just got a new plant for my collection! 🌱 This little one is going to look perfect on my desk.",
      image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      comments: 8,
      likes: 37
    },
    {
      author: {
        username: "travel_enthusiast",
        displayName: "Travel Enthusiast",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      content: "Exploring the hidden trails in the mountains this weekend. Nature never ceases to amaze me with its beauty.",
      video: "/Video.mp4",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      comments: 15,
      likes: 89
    }
  ];


  return (

    <>

      <main className="max-w-3xl mx-auto transition-all duration-300 ease-in-out px-2 sm:px-0">

        {samplePosts.map((post, index) => (
          post.video ? (
            <VideoCard key={`video-${index}`} post={post} />
          ) : (
            <PostCard key={`post-${index}`} post={post} />
          )
        ))}

      </main>


    </>


  )




}
