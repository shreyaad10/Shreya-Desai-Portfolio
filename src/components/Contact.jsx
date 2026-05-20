function Contact(){

return(

<section
id="contact"
className="px-10 py-24"
>

<h1 className="text-4xl font-bold">

Contact Me

</h1>

<input
placeholder="Name"
className="block bg-gray-900 p-4 mt-6 rounded-lg w-full"
/>

<input
placeholder="Email"
className="block bg-gray-900 p-4 mt-4 rounded-lg w-full"
/>

<textarea
placeholder="Message"
className="block bg-gray-900 p-4 mt-4 rounded-lg w-full h-32"
/>

<button
className="bg-purple-600 px-6 py-3 mt-4 rounded-lg"
>

Send

</button>

</section>

)

}

export default Contact