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
            
            <p> I am a recent graduate with a B.S. in Computer Science from Northern Illinois University, looking for an entry level software developer position.
                I am skilled in many popular programming languages and frameworks.
                (For a detailed list go to <a href="#skills">My Skills</a>). 
            </p>

            <h3>Personal Life</h3>

            <div className="floating-content">
                <img src="media/src5.jpg"/>
            </div>
            <p>
                I was born and raised in Tinley Park, Illinois. My first experience with programming was in AP Computer Science.
                I was a natural at it, and instantly got hooked. I decided to make CS my major. 
                I plan on staying near the Chicago area, and I can't wait to get my career started.
            </p>

            <h3>Hobbies</h3>

            <div className="floating-content">
                <img src="media/src4.png"/>
            </div>
            <p>
                    I like to keep both my logical and creative side stimulated. Besides programming in my free time, a good way to do this is by playing my favorite game,
                Dungeons and Dragons. I create my own plot lines and run them with a small group once a week. I also enjoy a lot of tabletop games that I play with friends and family. 
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
            <p>&#x2B07; Scroll Down &#x2B07;</p>
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
        this.state = {id:0};
    
        this.selectDiv = this.selectDiv.bind(this);
        this.unfocusedListItems = [];
        this.listItems = [];
    }

    componentDidMount(){
        this.setState({id:0});
        this.timerID = setInterval(() => this.selectDiv(this.state.id+1), 5000);
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    onUpdateItem = i => {

        this.setState(state => {
            const focus = this.props.focus.map(item => false);
       
            return {
              focus,
            };
          });

        this.setState(state => {
            const focus = this.props.focus.map((item, j) => {
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

    selectDiv(value){

        clearInterval(this.timerID);
        this.timerID = setInterval(() => this.selectDiv(this.state.id+1), 5000);


        if(value >= this.props.lists.length)
        {
            value = 0;
        }

        this.setState({id: value});

        this.timer = setTimeout(() => {this.onUpdateItem(this.state.id), this.setState({focused: true})}, 500);

    }

    render(){

        this.unfocusedListItems = [];
        this.listItems = [];

        for(let i = 0; i < this.props.lists.length; i++){
            if(i !== this.state.id){
                this.unfocusedListItems.push(<div onClick={() => this.selectDiv(i)} className="focused-out option"><ul><li key={i.toString() + " unfocus"}> &#x2022; {this.props.titles[i]} &#x2022;</li></ul></div>);
            }
            else{
                this.unfocusedListItems.push(<div className="small-focus option"><ul><li key={i.toString() + " small-focus"}>&#x2022; {this.props.titles[i]} &#x2022;</li></ul></div>);
            }
        }

        this.listItems = this.props.lists[this.state.id].map((number) =>
    <li key={number.toString() + " focused"}>
      {number}
    </li>);

        var classes = this.state.focused ? "focused-in details main-focus" : "focused-out details main-focus";

        return(
            <div className="radio-wrapper">
                    <div className="radio-unfocus">
                        {this.unfocusedListItems}
                    </div>

                    <div className="radio-focus">
                        <ul className={classes}>
                            {this.listItems}
                        </ul>
                    </div>
            </div>
        );
    }
}

function GradientImage(props){
    return(
        <div className="gradient-image" style={{height: props.height}}>{props.children}</div> 
    );
}

class ChangingDiv extends React.Component{
    constructor(props)
    {
        super(props);
        this.divcount = 0;
        this.state = {fadeIn: true};
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
            this.divcount = this.props.descriptions.length-1;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true})}, 500);
    }

    manualNextDiv(){
        this.setState({fadeIn: false});

        this.divcount++;

        if(this.divcount >= this.props.descriptions.length)
        {
            this.divcount = 0;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true})}, 500);
    }

    nextDiv(){
        this.setState({fadeIn: false});

        this.divcount++;

        if(this.divcount >= this.props.descriptions.length)
        {
            this.divcount = 0;
        }

        this.timer = setTimeout(() => {this.setState({fadeIn:true})}, 500);
    }

    render(){

  const classnames = this.state.fadeIn ? "fadeIn" : "fadeOut";

        return(
        <div className="carousel">
            <label htmlFor="btn1">&#x25C0;</label>
            <div className = "changingdiv-wrapper">
                
                <h4 className = {"qualities-title"}>{this.props.titles[this.divcount]}</h4>

                <div className = {classnames}>
                    <p>{this.props.descriptions[this.divcount]}</p>
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

        if(document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
        {
            if(!this.state.visible)
                this.setState({visible: true});
        }
        else
        {
            if(this.state.visible)
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

function FadeInComponent(props){
    const CustomType = `${props.type}`;
    return(
        <FadeIn once={props.once} delay={props.delay}>
            <CustomType href={props.destination} className={props.class}>{props.text}</CustomType>
        </FadeIn>
    );
}

  

class FadeIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {inViewPort: false};
        this.once = props.once;
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

            if(rect.top <= (window.innerHeight || document.documentElement.clientHeight)){
                this.setState({inViewPort: true});
            }
        }
        else if(!this.once && rect.top > (window.innerHeight || document.documentElement.clientHeight)){
                this.setState({inViewPort: false});
        }
    }

    render(){

        var classnames = this.state.inViewPort ? "visible " : "";
        var classnames = this.once ? classnames+"fade once" : classnames+"fade"
        return(
            <div ref={this.ref} style={{transitionDelay: this.delay}} className={classnames}>{this.props.children}</div>
        )
    };
}
function Intro(props){
    return(
        <div className="gradient-image">
            <div className="content">
                <h1>Hello. Welcome to my online resume.</h1>
                <FadeInComponent once={false} text="Click a link to skip to a specific section, or keep scrolling down to continue." delay="0s" type="h1"/>
                
                <div className="intro-navbar">
                    <FadeInComponent once={true} destination="#aboutme" text="About Me" delay="0s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#skills" text="My Skills" delay="0.5s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#qualities" text="My Qualities" delay="1s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#projects" text="My Projects" delay="1.5s" type="a" class="link"/>
                    <FadeInComponent once={true} destination="#contactme" text="Contact Me" delay="2s" type="a" class="link"/>
                </div>
                <GradientImage height="25vh"/>
                <FadeInComponent once={true} text="Let's start with some background..." delay="0s" type="h1"/>
            </div>
        </div>
    );
}


function Skills(props){
    return(
        <div className="skills-content">
            <h1 id="skills">My Skills</h1>        
        <div className = "list-wrapper">
            <RadioSelectDiv lists = {[["JavaScript", "React JS", "HTML", "CSS", "SQL", "PHP", "jQuery"], 
            ["C++", "C#", "Java", ".NET", "Python"], ["Swift", "Android Studio", "XCode"], 
            ["Git", "Visual Studio", "vim", "Sublime Text", "Eclipse"], ["Windows", "Unix", "Docker", "XAMPP", "AGILE"]]} 
            titles = {["Web", "Software", "Mobile", "Tools", "Misc."]} focus={[true,false,false,false,false]}/>
        </div>
            {/*<p>Web Development: My favorite type of development. Front-end is specifically my favorite. This website uses most of the front-end technologies listed including React,
            HTML, and CSS.
            </p>
            <p>Software Development: The meat and potatoes of programming, my coursework in C++, Java, and .NET taught me OOP principles, 
                popular algorithms and data structures, and the MVC design philosophy. Interested to see what I've done? 
                Go to:<a href="#projects"> my projects.</a></p>
            <p>Mobile Development: Whether you want to develop for Apple or Android, I'm proficient in both!</p>
            <p>Development Tools: Whether your team codes in a terminal or an advanced IDE, I'll feel right at home.
                 This website was coded on Visual Studio Code, both on Windows and Unix systems (mostly Unix - MacOS), using git as version control.</p>
            <p>Miscellaneous: I am confident I can code on any environment, but I'm most confident on a Windows or Unix machine, with AGILE code practices.</p>*/}
        </div>
    );
}

function Qualities(props){
    return(
        <div className="qualities-content">
            <h1 id="qualities">My Qualities</h1>
            <FadeInComponent once={true} delay="0s" text="Passion" type="h2"/>
            <FadeInComponent once={true} delay="0s" text="I am always looking to improve my skillset and solve unique challenges. 
            When programming, bugs are bound to show up. Most people look at them as nuisances. 
            I view them as a challenge, and when I fix a particularly nasty or persistent bug, 
            I experience a surge of satisfaction that is almost addicting." type="p" delay="0.5s"/>

            <FadeInComponent once={true} delay="0s" text="Detail-Oriented" type="h2"/>
            <FadeInComponent once={true} delay="0s" text="When programming for long periods of time, it's easy to overlook small details. 
            I make a point of looking for the little things." type="p" delay="0.5s"/>
            <FadeInComponent once={true} delay="0s" text="Team Player" type="h2"/>

            <FadeInComponent once={true} delay="0s" text="In college courses, I often worked in small teams of 2-4. I believe that I thrive in a team setting, 
            when I can bounce ideas off of other people and learn concepts from other developers." type="p" delay="0.5s"/>
        </div>
    )
}

function Projects(props){
    return(
        <div className="projects-content">
            <h1 id="projects">My Projects</h1>
            <div className="project-buttons">
                <ProjectButton destination="https://github.com/Quatts/Model_Prediction" title="Stock Price Predictor" src="media/python-logo.png" id="project-one"/>
                <ProjectButton destination="https://github.com/Quatts/OnlineResume/" title="Online Resume" src="media/react-js.png" id="project-two"/>
                {/*<ProjectButton destination="https://www.github.com" title="Sample Project 3" src="media/src1.jpeg" id="project-three"/>
                <ProjectButton destination="https://www.github.com" title="Sample Project 4" src="media/src1.jpeg" id="project-four"/>*/}
            </div>
        </div>
    )
}

function ProjectButton(props)
{
    let imageSource = props.src;
    return(
    <div className="project-preview-wrapper">
        <label className="project-preview" htmlFor={props.id}>{props.title}</label>
        <div onClick={() => window.location = props.destination} className="project-preview-image" style={{backgroundImage : "url("+imageSource+"), linear-gradient(to bottom,rgba(255,255,255,0), rgb(255,255,255))"}}>
            <form action={props.destination}>
                <button id={props.id} type="submit">{props.title}</button>
            </form>
        </div>
    </div>
    )
}

function ContactMe(props)
{
    return(
        <div className="contact-content" id="contactme">
            <FadeInComponent once={true} delay="0s" text="alexanderquatrini@gmail.com" type="h2"/>
            <FadeInComponent destination="https://www.linkedin.com/in/alexander-quatrini/" once={true} delay="0s" text="LinkedIn" type="a"/>
        </div>
    )
}

function Footer(props)
{
    return(
        <div className="footer-content">
            <p>This website was programmed entirely by me, Alexander Quatrini</p>
        </div>
    )
}

function App(){
    return (
    <div className="webPage">
        <BackToTop text="back to top" desiredClassName="return-to-top"/>
        <Header/>
        <Intro/>
        <AboutMe/>
        <GradientImage height="30vh"><FadeInComponent once={true} delay="0s" text="What about practical skills?" type="h1"/></GradientImage>
        <Skills/>
        <GradientImage height="30vh"><FadeInComponent once={true} delay="0s" text="Three qualities I'm most proud of having..." type="h1"/></GradientImage>
        <Qualities/>
        <GradientImage height="40vh"><FadeInComponent once={true} delay="0s" text="Let's see everything come together to form practical programs!" type="h1"/></GradientImage>
        <Projects/>
        <GradientImage height="10vh"><FadeInComponent once={true} delay="0s" text="Like what you see? Here's my info..." type="h1"/></GradientImage>
        <GradientImage height="35vh"> <ContactMe/> </GradientImage>
        <Footer/>
    </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);