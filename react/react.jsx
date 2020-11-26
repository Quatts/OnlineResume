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
            
                <img src="media/niu.png"/>
            </div>
            
            <p>    My name is Alexander Quatrini, I am a recent graduate with a B.S. in Computer Science from Northern Illinois University, looking for an entry level software developer position.
                Ideally, I would like to have a position as a front end or full stack developer, but I am skilled in many types of programming languages and frameworks.
                (For a detailed list go to <a href="#skills">My Skills</a>). 
            </p>

            <h3>Personal Life</h3>

            <div className="floating-content">
                <img src="media/src5.jpg"/>
            </div>
            <p>
                I was born and raised in Illinois. My first experience with programming was in AP Computer Science.
                I was a natural at it, and got instantly hooked. I decided to make CS my major. At college, I met my now girlfriend 
                in my sophomore year. I plan on staying near the Chicago area, and can't wait to get my career started.
            </p>

            <h3>Hobbies</h3>

            <div className="floating-content">
                <img src="media/src4.png"/>
            </div>
            <p>
                    I like to keep both my logical and creative side stimulated. Besides programming in my free time, a good way to do this is by playing my favorite game,
                Dungeons and Dragons. I usually play the role of the dungeon master which means I run the game for a small group of players.
                I create my own stories and run them with my group once a week. I enjoy a lot of tabletop games that I play with friends and family. 
            </p>
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

class RadioSelectDiv extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {lists: this.props.lists, titles: this.props.titles, focus: this.props.focus};
        this.divcount = 0;
    
        this.selectDiv = this.selectDiv.bind(this);
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.selectDiv(this.divcount), 5000);
        this.setState({id:0});
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    onUpdateItem = i => {

        this.setState(state => {
            const focus = state.focus.map(item => false);
       
            return {
              focus,
            };
          });

        this.setState(state => {
            const focus = state.focus.map((item, j) => {
                if(j===i)
                {
                    return !item;
                } else{
                    return item;
                }
            });
            return{
                focus,
            };
        });
    };

    selectDiv(){

        this.setState({focused: false});

        this.divcount++;

        if(this.divcount >= this.state.lists.length){
            this.divcount = 0;
        }

        this.timer = setTimeout(() => {this.onUpdateItem(this.divcount), this.setState({focused: true})}, 500);
    }

    render(){

        var unfocusedListItems = [];

        for(var i = 0; i < this.state.lists.length; i++){
            if(i != this.divcount){
                unfocusedListItems.push(<div className="focused-out option"><ul><li key={i.toString() + " unfocus"}> &#x2022; {this.state.titles[i]} &#x2022;</li></ul></div>);
        }
            else{
                unfocusedListItems.push(<div className="small-focus option"><ul><li key={i.toString() + " small-focus"}>&#x2022; {this.state.titles[i]} &#x2022;</li></ul></div>);
            }
    }

        const listItems = this.state.lists[this.divcount].map((number) =>
    <li key={number.toString() + " focused"}>
      {number}
    </li>);

        var classes = this.state.focused ? "focused-in details main-focus" : "focused-out details main-focus";

        return(
            <div className="radio-wrapper">
                    <div className="radio-focus">
                        <ul className={classes}>
                            {listItems}
                        </ul>
                    </div>
                    <div className="radio-unfocus">
                        {unfocusedListItems}
                    </div>
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
        this.setState({fadeIn: false});

        this.divcount--;

        if(this.divcount < 0)
        {
            this.divcount = this.state.lists.length-1;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true})}, 500);
    }

    manualNextDiv(){
        this.setState({fadeIn: false});

        this.divcount++;

        if(this.divcount >= this.state.lists.length)
        {
            this.divcount = 0;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true})}, 500);
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

        var prevList;
        var nextList;

        if(this.state.lists.length - 1 == this.divcount)
        {
            this.nextList = 0;
        }
        else{
            this.nextList = this.divcount + 1;
        }

        if(this.divcount == 0)
        {
            this.prevList = this.state.lists.length - 1;
        }
        else{
            this.prevList = this.divcount - 1;
        }

        const listItems = this.state.lists[this.divcount].map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );

        const prevListItems = this.state.lists[this.prevList].map((number) => 
    <li key={number.toString()}>
      {number}
    </li>
  );

        const nextListItems = this.state.lists[this.nextList].map((number) => 
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

class FadeInLink extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {inViewPort: false};
        this.once = props.once;
        this.text = props.text;
        this.destination = props.destination;
        this.delay = props.delay;
        
        this.handleScroll = this.handleScroll.bind(this);

        this.ref = React.createRef();
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        var rect = this.ref.current.getBoundingClientRect();
        
        if(!this.state.inViewPort)
        {

            if(rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)){
                this.setState({inViewPort: true});
            }
        }
        else if(!this.once && rect.bottom > (window.innerHeight || document.documentElement.clientHeight)){
            this.setState({inViewPort: false});
        }
    }

    render(){

        var classnames = this.state.inViewPort ? "visible " : "";
        var classnames = this.once ? classnames+"fade once" : classnames+"fade"

        return(
            <a ref={this.ref} className={classnames} href={this.destination} style={{transitionDelay: this.delay}}>{this.text}</a>
        )
    };
}

class BackToTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {visible: false};
        this.text = props.text;
        this.desiredClassName = props.desiredClassName;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){

        if(!this.state.visible && (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150))
        {
            this.setState({visible: true});
        }
        else if((document.body.scrollTop || document.body.scrollTop) < 150)
        {
            this.setState({visible: false});
        }
    }

    render(){
        var classnames = this.state.visible ? this.desiredClassName + " visible" : this.desiredClassName;

        return(
            <a className={classnames} href="#root">{this.text}</a>
        )
    }
}

class FadeInHeader extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {inViewPort: false};
        this.once = props.once;
        this.text = props.text;
        this.destination = props.destination;
        this.delay = props.delay;
        
        this.handleScroll = this.handleScroll.bind(this);

        this.ref = React.createRef();
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        var rect = this.ref.current.getBoundingClientRect();
        
        if(!this.state.inViewPort)
        {

            if(rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)){
                this.setState({inViewPort: true});
            }
        }
        else if(!this.once && rect.bottom > (window.innerHeight || document.documentElement.clientHeight)){
            this.setState({inViewPort: false});
        }
    }

    render(){

        var classnames = this.state.inViewPort ? "visible " : "";
        var classnames = this.once ? classnames+"fade once" : classnames+"fade"

        return(
            <h2 ref={this.ref} className={classnames}>{this.text}</h2>
        )
    };
}

function Intro(props){
    return(
        <div className="gradient-image">
            <div className="content">
                <h1>Hello. Welcome to my online resume.</h1>
                <FadeInHeader once={false} text="Click a link to skip to a specific section, or keep scrolling down to continue." delay="0s"/>
                
                <div className="intro-navbar">
                    <FadeInLink once={true} destination="#aboutme" text="About Me" delay="0s"/>
                    <FadeInLink once={true} destination="#skills" text="My Skills" delay="0.5s"/>
                    <FadeInLink once={true} destination="#projects" text="My Projects" delay="1s"/>
                    <FadeInLink once={true} destination="#contactme" text="Contact Me" delay="1.5s"/>
                </div>
            </div>
        </div>
    );
}


function Skills(props){
    return(
        <div className="skills-content">
            <h1>My Skills</h1>        
        <div className = "list-wrapper" id="skills">
            <RadioSelectDiv lists = {[["Javascript", "React JS", "HTML", "CSS", "SQL", "PHP", "jQuery"], 
            ["C++", "C#", "Java", ".NET", "Python"], ["Swift", "Android Studio", "XCode"], 
            ["Git", "XAMPP", "Visual Studio", "vim", "Sublime Text", "Eclipse"], ["Windows", "Unix"]]} 
            titles = {["Web", "Software", "Mobile", "Tools", "Misc."]} focus={[true,false,false,false,false]}/>
        </div>
            <p>Web Development: DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
            <p>Software Development: DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
            <p>Mobile Development: DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
            <p>Development Tools: DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
            <p>Miscellaneous: DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</p>
        </div>
    );
}

function App(){
    return (
    <div className="webPage">
        <BackToTop text="back to top" desiredClassName="return-to-top"/>
        <Header/>
        <Intro/>
        <AboutMe/>
        <div className="gradient-image-25"></div>

        <Skills/>
    </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);