/* HOC - Higher Order Component

All Aux does is wrap another compnent and does not contain its own logic, styling, 
or add any structure to the JSX code or real DOM that will be rendered. It just wraps
another component and then adds some extra logic (in some cases, not this one).

Aux component is a functional component that doesn't manage any state
Don't have to import React since there is no JSX elements
*/


const aux = (props) => props.children;

export default aux;

