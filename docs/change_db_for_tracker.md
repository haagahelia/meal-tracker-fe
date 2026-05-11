## What our backend would need (to fully connect APIs)

We are missing a key entity:

👉 meals table (not in our schema yet)

Something like:

```sql
CREATE TABLE meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  recipe_id INT NOT NULL,
  servings DECIMAL(8,2) NOT NULL,
  meal_type ENUM('breakfast','lunch','dinner','snack') NOT NULL
);
```

Then API:

```sql
GET    /meals?date=2026-05-11
POST   /meals
DELETE /meals/:id
```