
import styles from './dashboad.css';
import { appState, dispatch } from "../../store";



export default class Dashboard extends HTMLElement{


    constructor(){
        super();
        this.attachShadow({mode:"open"});

        }

    async connectedCallback() {
                


    }
    
    render() {
        
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = styles;
            this.shadowRoot?.appendChild(css);
    }
}
customElements.define("app-dashboard", Dashboard);