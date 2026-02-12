// () = {}
// component = html + css + js
// JSX
// fragment

import './style.css';

const MyComponent = () => {
  return (
    <>
        <div> eric && hoidanit</div>
        <div className="child"
          style={{borderRadius: "10px"}}
        >child</div>
    </>
  );
}

export default MyComponent;