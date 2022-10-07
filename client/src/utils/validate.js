const validate = (input) => {
    let err = {}
    if (!input.name || input.name.length < 3) {
      err.name = "Name must have at least 3 characters"
    }
    if (!input.difficulty || input.difficulty < 1 || input.difficulty > 5) {
      err.difficulty = "Difficulty must be between 1 and 5"
    }
    if (!input.duration || input.duration < 1 || input.duration > 24) {
      err.duration = "Duration must be between 1 and 24"
    }
    if (input.countries.length === 0) {
      err.countries = "You must select at least one country"
    }
    if (input.season.length === 0) {
      err.season = "You must select at least one season"
    }
    return err
}

export default validate