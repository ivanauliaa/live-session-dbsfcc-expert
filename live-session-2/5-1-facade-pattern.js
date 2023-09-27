class FoodOrder {
    static async order(menu) {
        try {
            const accountant = new Accountant();
            const kitchen = new Kitchen();
            const chef = new Chef();

            const bill = await accountant.recordOrder(menu);
            await kitchen.verifyAvailabilityIngredients(menu);
            const orderedFood = await chef.cook(menu);
            return { orderedFood, bill };
        } catch (error) {
            console.log(`ups! order fail due ${error}`)
        }
    }
}

// facade
FoodOrder.order('spicy bulgogi');
