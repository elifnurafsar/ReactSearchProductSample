export const GetByCategoryOrName = (category_or_name) => {

    var request = fetch("/AutoPart/get_by_category_or_name/?category_or_name="+ category_or_name,  {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
      })
  
    return request
}

export const GetAll = () => {

    var request = fetch("/AutoPart",  {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
      })
  
    return request
}