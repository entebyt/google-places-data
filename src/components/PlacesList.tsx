import React from "react";
import { Link } from "react-router-dom";

export interface PlacesListProps {
  gymData: Array<{
    name: string;
    rating: string;
    reference: string;
    vicinity: string;
  }>;
  loadMoreVisible: string;
  loadMore: () => void;
  loading: boolean;
}

export interface PlacesListState {}

class PlacesList extends React.Component<PlacesListProps, PlacesListState> {
  state = {};
  // getReferenceData = (reference: string) => {
  //   this.props.history.push(``);
  // };
  render() {
    return (
      <>
        {this.props.gymData.map(gym => (
          <Link to={`/get_type_reference_data/${gym.reference}`}>
            <div className="places-list-item">
              <p>{gym.name}</p>
              <p>{gym.rating}</p>
              <p>{gym.vicinity}</p>
            </div>
          </Link>
        ))}
        {this.props.loadMoreVisible &&
          (this.props.loading ? (
            <p>loading....</p>
          ) : (
            <button
              onClick={() => this.props.loadMore()}
              className="btn btn-block btn-primary"
            >
              Load More
            </button>
          ))}
      </>
    );
  }
}

export default PlacesList;
