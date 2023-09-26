import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className='text-8xl opacity-5'>Todo App</h1>
      <form id="form" className='max-w-full w-96'>
        <input
          type="text"
          id="input"
          class="input"
          placeholder="Enter your todo"
          autocomplete="off"
        />
        <ul class="todos" id="todos"></ul>
      </form>
      <div>
        <p>Left click to toggle complete.</p>
        <p>Right click to delete the todo.</p>
      </div>
    </main>
  )
}
