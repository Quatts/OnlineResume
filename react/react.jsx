function Link(props)
{
    return <a href={props.destination}>{props.name}</a>
}

function Header(props)
{
    return <h1>{props.text}</h1>
}

function Paragraph(props)
{
    return <p>{props.text}</p>
}

function App(){
    return (
    <div className="pageTop">
        <div className="header">
            <Header text="Alexander Quatrini"/>
            <Paragraph text="Passionate, efficient, and creative development."/>
        </div>

        <div className="navbar">
            <Link destination="#" name="About Me"/>
            <Link destination="#" name="Skills"/>
            <Link destination="#" name="Projects"/>
        </div>
    </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);