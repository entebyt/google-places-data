import * as React from "react";
import PlacesList from "./PlacesList";
import queryString from "query-string";
import { RouteComponentProps } from "react-router";
export interface GetPlacesProps {}

export interface GetPlacesState {}

class GetPlaces extends React.Component<
  RouteComponentProps<GetPlacesProps>,
  GetPlacesState
> {
  state = {
    lat: "",
    long: "",
    initialLoad: true,
    radius: "",
    types: "",
    gymData: [],
    errorMessage: "",
    loading: false,
    nextPageToken: ""
  };
  componentDidMount = () => {
    const values = queryString.parse(this.props.location.search);

    if (!(Object.keys(values).length === 0)) {
      this.setState({ lat: "bitch", long: "glitch" });
      this.setState({
        lat: values.lat,
        long: values.long,
        radius: values.radius,
        types: values.types
      });

      this.getPlaces(values);
    }
  };
  getPlaces = async (values?: queryString.ParsedQuery<string>) => {
    const { lat, long, radius, types, nextPageToken, gymData } = this.state;
    this.setState({ loading: true });

    const queryStringUrl = `http://localhost:4000/placeList?lat=${values &&
      values.lat}&long=${values && values.long}&radius=${values &&
      values.radius}&types=${values && values.types}`;
    const localhosturl = nextPageToken
      ? `http://localhost:4000/placeList?nextPageToken=${nextPageToken}`
      : `http://localhost:4000/placeList?lat=${lat}&long=${long}&radius=${radius}&types=${types}`;
    const url = nextPageToken
      ? `https://heat-admin-server.herokuapp.com/placeList?nextPageToken=${nextPageToken}`
      : `https://heat-admin-server.herokuapp.com/placeList?lat=${lat}&long=${long}&radius=${radius}&types=${types}`;
    if (this.state.initialLoad || this.state.nextPageToken) {
      const data = await (await fetch(
        values ? queryStringUrl : localhosturl
      )).json();

      this.setState({
        gymData: [...gymData, ...data.results],
        errorMessage: data.error_message && data.error_message,
        initialLoad: data.error_message && data.results.length ? false : true,
        nextPageToken: data.next_page_token && data.next_page_token,
        loading: false
      });
    }
  };
  render() {
    const { lat, long, radius, types, gymData } = this.state;
    return (
      <div className="get-location-form">
        <form>
          <div className="form-group">
            <input
              required
              placeholder="lat"
              value={lat}
              onChange={event => this.setState({ lat: event.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              required
              placeholder="long"
              value={long}
              onChange={event => this.setState({ long: event.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              required
              placeholder="radius"
              value={radius}
              onChange={event => this.setState({ radius: event.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              required
              placeholder="types"
              value={types}
              onChange={event => this.setState({ types: event.target.value })}
            />
          </div>
          <p>{this.state.errorMessage}</p>
          {this.state.loading ? (
            <p>loading......</p>
          ) : (
            <button
              className="btn btn-block btn-primary"
              type="submit"
              onClick={() => this.getPlaces()}
            >
              Get Places
            </button>
          )}
        </form>
        <PlacesList
          loading={this.state.loading}
          loadMoreVisible={this.state.nextPageToken}
          loadMore={this.getPlaces}
          gymData={gymData}
        />
      </div>
    );
  }
}

export default GetPlaces;
