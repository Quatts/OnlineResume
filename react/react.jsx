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

function AboutMe(props){
    return(
        <div className="about-content">
            <h1 id="aboutme">About Me</h1>
            <div className="floating-content">
            
                <ChangingImage images="media/niu.png, media/src2.jpeg, media/src1.jpeg" startimagesource="media/src1.jpeg"/>
            </div>
            
            <p>    My name is Alexander Quatrini, I am a recent graduate of Northern Illinois University, looking for an entry level software developer position.
                Ideally, I would like to have a position as a front end or full stack developer, but I am skilled in many types of programming languages and frameworks.
                (For a detailed list go to <a href="#skills">My Skills</a>). 
            </p>

            <h3>Personal Life</h3>
            <p>
                BLAH BLAH
            </p>

            <h3>Hobbies</h3>
            <p>
                BLAH BLAH
            </p>
        </div>
    );
}

function Intro(props){
    return(
        <div className="gradient-image">
            <div className="content">
                <h1 className="fade">Hello. Welcome to my online resume.</h1>
                <h2 className="fade">Skip to whichever section you'd like by clicking a link, or scroll down to continue.</h2>
                
                <div className="intro-navbar">
                    <a className="fade once" href="#aboutme">About Me</a>
                    <a className="fade once" href="#skills">My Skills</a>
                    <a className="fade once" href="#projects">My Projects</a>
                    <a className="fade once" href="#contactme">Contact Me</a>
                </div>
            </div>
        </div>
    );
}

function Navbar(props)
{
    return(
    <div className="navbar">
            <a href="#aboutme">About Me</a>
            <a href="#skills">My Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contactme">Contact Me</a>
    </div>
    );
}

function Header(props){
    return(
        <div className="header">
            <h1 id="top">Alexander Quatrini</h1>
            <p>Passionate, Efficient, and Creative Development</p>
        </div>
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
        <a className="return-to-top" href="#root">back to top</a>
        <Header/>
        <Navbar/>
        <Intro/>
        <AboutMe/>
        <div className="gradient-image"/>
        
        <div className = "list-wrapper" id="skills">
            <ChangingDiv lists = {[["Javascript", "React JS", "HTML", "CSS", "SQL", "PHP"], 
            ["C++", "C#", "Java", ".NET", "Python"], ["Swift", "Android Studio", "XCode"], 
            ["Github", "XAMPP", "Visual Studio", "vim", "Sublime Text", "Eclipse"], ["Windows", "Unix"]]} 
            titles = {["Web Development", "Software Development", "Mobile Development", "Tools", "Misc."]}/>
        </div>
    </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);