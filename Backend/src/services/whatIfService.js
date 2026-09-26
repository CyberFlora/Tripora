const adaptBudget = ({
    currentTrip,
    newBudget
}) => {

    const originalBudget = Number(currentTrip.budget);
    const updatedBudget = Number(newBudget);

    const numberOfDays = Number(currentTrip.numberOfDays);
    const numberOfPeople = Number(currentTrip.numberOfPeople);

    if (!Number.isFinite(updatedBudget) || updatedBudget <= 0) {
        throw new Error("New budget must be a positive number.");
    }

    if (!Number.isFinite(numberOfDays) || numberOfDays <= 0) {
        throw new Error("Number of days must be valid.");
    }

    if (!Number.isFinite(numberOfPeople) || numberOfPeople <= 0) {
        throw new Error("Number of people must be valid.");
    }


    const budgetRatio =
        originalBudget > 0
            ? updatedBudget / originalBudget
            : 1;


    let accommodation;
    let activities;
    let food;
    let changes = [];


    if (budgetRatio >= 1) {

        accommodation = currentTrip.accommodation || "hotel";
        activities = "Full experience plan";
        food = "Comfort dining";

        changes.push(
            "Current travel plan can be maintained within the new budget."
        );

    } else if (budgetRatio >= 0.8) {

        accommodation = "Comfort hotel";
        activities = "Most planned experiences";
        food = "Local and comfort dining";

        changes.push(
            "Reduced accommodation and dining costs moderately."
        );

    } else if (budgetRatio >= 0.6) {

        accommodation = "Budget hotel";
        activities = "Prioritized experiences";
        food = "Mostly local dining";

        changes.push(
            "Switched to lower-cost accommodation."
        );

        changes.push(
            "Prioritized the most important activities."
        );

        changes.push(
            "Reduced dining costs using local options."
        );

    } else {

        accommodation = "Budget stay";
        activities = "Free and low-cost experiences";
        food = "Budget local dining";

        changes.push(
            "Switched to budget accommodation."
        );

        changes.push(
            "Focused on free and low-cost activities."
        );

        changes.push(
            "Reduced food spending using affordable local options."
        );
    }


    const estimatedDailySpending =
        Math.round(updatedBudget / numberOfDays);


    const estimatedDailySpendingPerPerson =
        Math.round(
            updatedBudget /
            numberOfDays /
            numberOfPeople
        );


    return {

        originalBudget,

        newBudget: updatedBudget,

        estimatedDailySpending,

        estimatedDailySpendingPerPerson,

        accommodation,

        activities,

        food,

        changes
    };
};


module.exports = {
    adaptBudget
};