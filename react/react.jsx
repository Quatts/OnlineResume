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

function Image(props)
{
    return <img src={props.source} height={props.height} width={props.width}></img>
}

class ChangingImage extends React.Component{
    constructor(props){
        super(props);
        this.imageSources = props.images.split(",");
        this.state = {imagesource: props.startimagesource};

    }
    
    componentDidMount(){
        this.timerID = setInterval(() => this.nextImage(), 5000);
        this.imagecount = 0;
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    nextImage(){
        if(this.imagecount >= this.imageSources.length)
        {
            this.imagecount = 0;
        }

        this.setState({imagesource: this.imageSources[this.imagecount]});
        this.imagecount++;
    }

    render(){
        return(
            <Image source = {this.state.imagesource} height={this.props.height} width={this.props.width}/>
        );
    }
}

function App(){
    return (
    <div className="webPage">
        <div className="header">
            <Header text="Alexander Quatrini"/>
            <Paragraph text="Passionate, efficient, and creative development."/>
        </div>

        <div className="navbar">
            <Link destination="#" name="About Me"/>
            <Link destination="#" name="Skills"/>
            <Link destination="#" name="Projects"/>
            <Link destination="#" name="Contact Me"/>
        </div>

        <div className="imageCarousel">
            <ChangingImage images="media/src1.png,media/src2.png,media/src3.png" startimagesource = "media/src3.png"/>
        </div>
    </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);