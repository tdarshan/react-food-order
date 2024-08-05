import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";

const requestConfig = {};

const Meals = () => {

    const { 
        data: loadedMeals, 
        isLoading, 
        error 
    } = useHttp('http://localhost:3000/meals', requestConfig, []);
    
    if(isLoading) {
        return <p className="center">Fetching meals</p>;
    }

    if(error) {
        return <Error title="Something went wrong" message={error} />;
    }

    return (
        <ul id="meals">
            {loadedMeals && loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}

export default Meals