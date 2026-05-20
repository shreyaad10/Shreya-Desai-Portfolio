const skills=[

"React",
"JavaScript",
"Python",
"Node",
"MySQL",
"MongoDB",
"Tailwind"

]

function Skills(){

return(

<section
id="skills"
className="px-10 py-24"
>

<h1 className="text-4xl font-bold">

Skills

</h1>

<div className="grid grid-cols-3 gap-4 mt-10">

{skills.map((skill)=>(

<div
className="bg-gray-900 p-6 rounded-lg"
key={skill}
>

{skill}

</div>

))}

</div>

</section>

)

}

export default Skills