import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BodyHome from '../components/BodyHome';
import Title from '../components/Title';

// import tw, {styled} from 'twin.macro';

// const Header = styled.h1`
//   ${(props) => {
//       return props.hasHover && tw`bg-red-200`}
// }
//   ${tw`border`}
//   color: purple;
// `


export class Home extends Component {
    state = {
        name: 'DOETHY',
        // kondisi: false
    }
    render() {
        return (
            <React.Fragment>
                <Navbar greet={this.state.name} />
                {/* <Header hasHover={this.state.kondisi}>Klikikan</Header>
                <button onClick={() => {
                    this.setState({
                        kondisi: !this.state.kondisi
                    })
                }}>Change
                </button>    */}
                <Title />
                <Sidebar />
                <BodyHome welcome={this.state.name} />
                    {/* <Body welcome={this.state.name} /> */}
                    {/* <Ayoeng name={'GLEYUNG'}/> */}
            
            </React.Fragment>
            
        )
    }
}

export default Home
