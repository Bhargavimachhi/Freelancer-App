import { useState } from 'react'
import { Button } from './components/ui/button'
import { CardWithForm } from './components/NameCard'



function App() {
  

  return (
    <>

    <h1>This is an example componet</h1>
    <CardWithForm/>

    <h1> This is the button</h1>
    <Button>Click me</Button>

    <h1 className='bg-black text-white font-bold'>This is react stater template</h1>
   
    </>
  )
}

export default App
