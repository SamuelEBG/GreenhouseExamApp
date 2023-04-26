
export function ErrorView(props) {
    return (
        <div>
      <span
          style={{ border: "2px solid black", background: "red", margin: "auto"}}
      >
        {props.error.toString()}
      </span>
        </div>
    );
}