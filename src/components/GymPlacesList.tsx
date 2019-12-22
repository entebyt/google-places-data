import * as React from "react";
export interface GymGymPlacesListProps {}

export interface GymGymPlacesListState {}

class GymGymPlacesList extends React.Component<
  GymGymPlacesListProps,
  GymGymPlacesListState
> {
  state = {
    gym: {
      name: "",
      rating: "",
      reference: "",
      formatted_phone_number: "",
      vicinity: "",
      comment: ""
    },
    comment: "",
    commentLoading: false,
    loading: false,
    gymList: [
      {
        name: "",
        rating: "",
        reference: "",
        formatted_phone_number: "",
        vicinity: ""
      }
    ]
  };
  componentDidMount = async () => {
    this.setState({ loading: true });

    const url = "https://heat-admin-server.herokuapp.com/gymPlaceList";
    const gymList = await (await fetch(url)).json();

    this.setState({ gymList, loading: false });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <p>Loading....</p>
        ) : (
          this.state.gymList.map((gym, index) => <GymListItem gym={gym} />)
        )}
        <button className="btn btn-block btn-primary">Load More</button>
      </>
    );
  }
}
const GymListItem = ({ gym }: any) => {
  const [commentLoading, setCommentLoading] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [message, setMessage] = React.useState("");
  const addComment = async (reference: string, event: any) => {
    event.preventDefault();
    setCommentLoading(true);

    const url = "https://heat-admin-server.herokuapp.com/addGymPlaceComment";
    const response = await (await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reference, comment, date: new Date() })
    })).json();
    setCommentLoading(false);
    setMessage(response.message);
  };
  return (
    <div key={gym.reference} className="places-list-item">
      {/* <p>{index}</p> */}
      <div>
        <p>{gym.name}</p>
        <p>{gym.rating}</p>
        <p>{gym.formatted_phone_number}</p>
        <p>{gym.vicinity}</p>
      </div>
      <form
        className="w-100"
        onSubmit={event => addComment(gym.reference, event)}
      >
        <textarea
          className="comment-input"
          required
          onChange={event => setComment(event.target.value)}
        />
        <p>{message}</p>
        {commentLoading ? (
          <p>Loading....</p>
        ) : (
          <button type="submit" className="btn btn-block btn-primary">
            Add Comment
          </button>
        )}
      </form>
    </div>
  );
};

export default GymGymPlacesList;
