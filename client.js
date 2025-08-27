//client.js
const HOST="http://localhost:5555";

async function run(){
    let res1=await fetch(`${HOST}/posts`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"Title":"Harry Potter1","Author":"JKRolling1@gmail.com","Creation Date":new Date(1999,4,2),"Content":"A book about harry potter"})
    })
    const post1 = await res1.json();
    console.log(post1)

    let res2=await fetch(`${HOST}/posts`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"Title":"Harry Potter2","Author":"JKRolling2@gmail.com","Creation Date":new Date(2000,4,12),"Content":"A book about harry potter"})
    })
    const post2 = await res2.json();
    console.log(post2)

    let res3=await fetch(`${HOST}/posts`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"Title":"Harry Potter3","Author":"JKRolling3@gmail.com","Creation Date":new Date(2005,5,17),"Content":"A book about harry potter"})
    })
    const post3 = await res3.json();
    console.log(post3)


    let res4=await fetch(`${HOST}/posts`,{
        method:'GET',
        headers:{"Content-Type":"application/json"},
    })
    const allPosts = await res4.json();
    console.log("All posts with real IDs:", allPosts)

    const idbook = post1._id
    let res5=await fetch(`${HOST}/posts/${idbook}`,{
        method:'GET',
        headers:{"Content-Type":"application/json"},
    })
    const foundPost = await res5.json();
    console.log(foundPost)

    const Auth="JKRolling2@gmail.com"
    let res6=await fetch(`${HOST}/posts/author/${Auth}`,{
        method:'GET',
        headers:{"Content-Type":"application/json"},
    })
    const postsByAuthor = await res6.json();
    console.log(postsByAuthor)

    Title="Harry Potter2"
    let res7=await fetch(`${HOST}/posts/title/${Title}`,{
        method:'GET',
        headers:{"Content-Type":"application/json"},
    })
    const postByTitle = await res7.json();
    console.log(postByTitle)

    const idbook1 = post1._id
    const idbook2 = post2._id
    const idbook3 = post3._id

    let res8=await fetch(`${HOST}/posts/${idbook1}`,{
        method:'DELETE',
        headers:{"Content-Type":"application/json"},
    })
    const deleteResult1 = await res8.json();
    console.log(deleteResult1)

    let res9=await fetch(`${HOST}/posts/${idbook2}`,{
        method:'DELETE',
        headers:{"Content-Type":"application/json"},
    })
    const deleteResult2 = await res9.json();
    console.log(deleteResult2)

    let res=await fetch(`${HOST}/posts/${idbook3}`,{
        method:'DELETE',
        headers:{"Content-Type":"application/json"},
    })
    const deleteResult3 = await res.json();
    console.log(deleteResult3)

}
run()