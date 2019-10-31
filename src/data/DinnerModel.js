import ObservableModel from "./ObservableModel";

const BASE_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
const httpOptions = {
  headers: { "X-Mashape-Key": "YOUR_API_KEY" }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
