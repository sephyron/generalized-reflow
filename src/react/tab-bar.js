import React from "react";
import ReactDOM from "react-dom";

const Tab = ({children, index, isSelected}) => (
  <div id={`tabpanel_${index}`}
       name={`tabpanel_${index}`}
       role="tabpanel"
       className={isSelected() ? 'active' : ''}
  >{children}</div>
)

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.tabs = props.children
    this.state = {selected: this.tabs.find(tab => tab.props.selected) || this.tabs[0]}
    this.selectTab = this.selectTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidUpdate() {
    this.activeLink.focus()
  }
  selectTab (tab) {
    this.setState({selected: tab})
  }
  handleClick (e, tab) {
    e.preventDefault()
    this.selectTab(tab)
  }
  render () {
    return (<div>
      <ul role="tablist">
        {this.tabs.map((tab, i) => (
          <li role="presentation">
            <a id={`tab_${i}`}
               href={`#tabpanel_${i}`}
               role="tab"
               className={`${tab === this.state.selected ? 'active' : ''}`}
               onClick={e => this.handleClick(e, tab)}
               ref={link => { if (tab === this.state.selected) this.activeLink = link}}
            >{tab.props.title}</a>
          </li>
        ))}
      </ul>
      <div>
        {this.tabs.map((tab, i) => (
          React.cloneElement(tab, {
            index: i,
            isSelected: () => tab === this.state.selected
          })
        ))}
      </div>
    </div>)
  }
}

const App = () => (
  <Tabs>
    <Tab title="Tab 1">
      
    </Tab>
    <Tab title="Tab 2">
      
    </Tab>
    <Tab title="Tab 3">
      
    </Tab>
  </Tabs>
)

ReactDOM.render(<App/>,
               document.getElementById('mount'))