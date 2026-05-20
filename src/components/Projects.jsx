const projects=[

"RAW Vision Media",

"OTT Platform Management System",

"Mafia Game"

]

function Projects(){

return(

<section
id="projects"
className="px-10 py-24"
>

<h1 className="text-4xl font-bold">

Projects

</h1>

<div className="grid grid-cols-3 gap-6 mt-10">

{projects.map((project)=>(

<div
className="bg-gray-900 p-6 rounded-lg"
key={project}
>

<h2>

{project}

</h2>

</div>

))}

</div>

</section>

)

}

export default Projects