function MyButton() {
  return (
    <button> I'm a button</button>
  );
}

export default function MyApp() {
  return(
    <div> 
      <h1 className = "text-blue-500"> Weather Dashboard</h1>
      <MyButton />
    </div>
  );
}