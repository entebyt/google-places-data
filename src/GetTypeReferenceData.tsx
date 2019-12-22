import * as React from "react";
export interface GetTypeReferenceDataProps {
  match: any;
}

export interface GetTypeReferenceDataState {}

class GetTypeReferenceData extends React.Component<
  GetTypeReferenceDataProps,
  GetTypeReferenceDataState
> {
  state = {
    gymData: { formatted_phone_number: "", name: "", rating: "" },
    comment: ""
  };
  componentDidMount = async () => {
    let reference = this.props.match.params.id;
    // const;
    const data = await (await fetch(
      `http://localhost:4000/getTypeReferenceData?reference=${reference}`
    )).json();

    data.result
      ? this.setState({ gymData: data.result })
      : this.setState({ error: "Couldn't load data, please retry" });
    console.log(data);
  };
  addComment = () => {};
  render() {
    const {
      formatted_phone_number = "",
      name = "",
      rating = ""
    } = this.state.gymData;
    return (
      <div className="places-data-container">
        <p>Phone: {formatted_phone_number}</p>
        <p>Name: {name}</p>
        <p>Rating: {rating}</p>
        <form onSubmit={this.addComment}>
          <textarea
            className="comment-input"
            required
            onChange={event => this.setState({ comment: event.target.value })}
          />
          <button type="submit" className="btn btn-block btn-primary">
            Add Comment
          </button>
        </form>
      </div>
    );
  }
}

export default GetTypeReferenceData;
