function Link(props)
{
    return <a href={props.destination}>{props.name}</a>
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
            <Image source = {this.state.imagesource}/>
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
        this.manualNextDiv = this.manualNextDiv.bind(this);
        this.manualPrevDiv = this.manualPrevDiv.bind(this);
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.nextDiv(), 5000);
        this.setState({fadeIn:true});
    }

    componentWillUnmount(){
        clearInterval(timerID);
    }

    manualPrevDiv(){
        clearInterval(this.timerID);
        
        this.setState({fadeIn: false});

        this.divcount--;

        if(this.divcount < 0)
        {
            this.divcount = this.state.lists.length-1;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true}), 
        this.timerID = setInterval(() => this.nextDiv(), 5000);}, 500);
    }

    manualNextDiv(){
        clearInterval(this.timerID);
        this.setState({fadeIn: false});

        this.divcount++;

        if(this.divcount >= this.state.lists.length)
        {
            this.divcount = 0;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true}), 
        this.timerID = setInterval(() => this.nextDiv(), 5000);}, 500);
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
        <div className="carousel">
            <label htmlFor="btn1">&#x25C0;</label>
            <div className = "changingdiv-wrapper">

                <h4 className = {"skills-title"}>{this.state.titles[this.divcount]}</h4>

                <div className = {classnames}>
                    <ul>{listItems}</ul>
                </div>
                
                <div className = "buttons-wrapper">
                    <button className="btn1" id="btn1" onClick={this.manualPrevDiv}/>
                    <button className="btn2" id="btn2" onClick={this.manualNextDiv}/>
                </div>
            </div>
            <label htmlFor="btn2">&#x25B6;</label>
        </div>
        )
    };
}

function App(){
    return (
    <div className="webPage">
        <div className="header">
            <h1>Alexander Quatrini</h1>
            <p>Passionate, efficient, and creative development.</p>
        </div>

        <div className="navbar">
            <a href="#">About Me</a>
            <a href="#">My Skills</a>
            <a href="#">Projects</a>
            <a href="#">Contact Me</a>
        </div>

        <div className="gradient-image"/>

        <div className = "header-wrapper">
            <div className="sub-header">
                <BodyHeader text="ABOUT ME"/>
            </div>
        </div>

        <div className="about-me-wrapper">

        </div>  

        <div className = "header-wrapper">
            <div className="sub-header">
                <BodyHeader text="MY SKILLS"/>
            </div>
        </div>
        
        <div className = "list-wrapper">
            <ChangingDiv lists = {[["Java", "Javascript", "React JS", "HTML", "CSS", "SQL", "PHP"], 
            ["C++", "C#", ".NET", "Python"], ["Swift", "Android Studio", "XCode"], 
            ["Github", "XAMPP", "Visual Studio", "vim", "Sublime Text", "Eclipse"], ["Windows", "Unix"]]} 
            titles = {["Web Development", "Systems Development", "Mobile Development", "Tools", "Misc."]}/>
        </div>
    </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);