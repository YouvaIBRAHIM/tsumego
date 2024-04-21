import { Typography } from "@mui/material"
import { useStore } from "@reducers/counter"

function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}

function App() {

  return (
    <>
      <Typography variant="h1">Hello World</Typography>
      <BearCounter />
      <Controls />
    </>
  )
}

export default App
