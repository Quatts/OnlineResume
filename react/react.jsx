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

function BodyText(props)
{
    return <h3>{props.text}</h3>
}

function BodyHeader(props)
{
    return <h2>{props.text}</h2>
}

function UnorderedList(props)
{
    const items = props.itemList;

    const listItems = items.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

class ChangingImage extends React.Component{
    constructor(props){
        super(props);
        this.imageSources = props.images.split(",");
        this.state = {imagesource: props.startimagesource, fadeIn:true};

    }
    
    componentDidMount(){
        this.timerID = setInterval(() => this.nextImage(), 5000);
        this.imagecount = 0;
        this.setState({fadeIn:true});
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    nextImage(){
        
        this.setState({fadeIn: false});

        if(this.imagecount >= this.imageSources.length)
        {
            this.imagecount = 0;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true}), this.setState({imagesource: this.imageSources[this.imagecount]}),this.imagecount++}, 500);

    }

    render(){

        const classnames = this.state.fadeIn ? "fadeIn" : "fadeOut";
        return(
        <div className = {classnames}>
            <Image source = {this.state.imagesource} height="auto" width="25%"/>
        </div>
        );
    }
}

class ChangingDiv extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {lists: this.props.lists, titles: this.props.titles};
        this.divcount = 0;
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.nextDiv(), 5000);
        this.setState({fadeIn:true});
    }

    componentWillUnmount(){
        clearInterval(timerID);
    }

    nextDiv(){
        this.setState({fadeIn: false});

        this.divcount++;

        if(this.divcount >= this.state.lists.length)
        {
            this.divcount = 0;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true})}, 500);
    }

    render(){
        const listItems = this.state.lists[this.divcount].map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );

  const classnames = this.state.fadeIn ? "fadeIn details" : "fadeOut details";

        return(
            <div className = "changingdiv-wrapper">

                <h4 className = {"skills-title"}>{this.state.titles[this.divcount]}</h4>

                <div className = {classnames}>
                    <ul>{listItems}</ul>
                </div>
            </div>
        )
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
        <div className = "header-wrapper">
            <div className="sub-header">
                <BodyHeader text="ABOUT ME"/>
            </div>
        </div>
        <div className = "header-wrapper">
            <div className="sub-header">
                <BodyHeader text="MY SKILLS"/>
            </div>
        </div>
    <div className = "list-wrapper">
            <ChangingDiv lists = {[["Java", "Javascript", "React JS", "HTML", "CSS", "SQL", "PHP"], 
            ["C++", "C#", ".NET", "Python"], ["Swift", "Android Studio", "XCode"]]} 
            titles = {["Web Development", "Systems Development", "Mobile Development"]}/>
        </div>
    </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);