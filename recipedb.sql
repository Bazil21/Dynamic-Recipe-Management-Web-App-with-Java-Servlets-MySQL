SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Create or use the database
CREATE DATABASE IF NOT EXISTS tastify;
USE tastify;

-- Drop existing tables (if any)
DROP TABLE IF EXISTS `recipes`;
DROP TABLE IF EXISTS `users`;

-- Table structure for table `recipes`
CREATE TABLE `recipes` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `users`
CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert sample data for table `recipes`
INSERT INTO `recipes` (`id`, `title`, `category`, `ingredients`, `instructions`, `image`, `created_at`, `user_id`) VALUES
(1, 'Garlic Butter Shrimp Pasta', 'dinner', 
'-200g (7 oz) spaghetti or your preferred pasta
-200g (7 oz) shrimp (peeled and deveined)
-3 tbsp butter
-2 garlic cloves (minced)
-1/4 tsp red chili flakes (optional, for a bit of heat)
-1/4 cup grated Parmesan cheese
-2 tbsp olive oil
-Salt and black pepper to taste
-Fresh parsley (chopped, for garnish)', 
'1) Boil salted water, cook pasta, reserve 1/2 cup pasta water, then drain.
2) Season shrimp with salt and pepper.
3) Heat olive oil in a skillet, cook shrimp for 2-3 minutes per side, then set aside.
4) Melt butter in the same skillet, sauté garlic and chili flakes for 1 minute.
5) Add shrimp and drained pasta to the skillet, toss to coat in sauce.
6) Stir in Parmesan cheese, mix well, and adjust with pasta water if needed.
7) Garnish with parsley and serve hot.', 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8RK6GpKsq6_8PmnNfOsETGoqI3LW-w2hU6A&s', '2024-12-04 1:12:11', '0');

-- Insert sample data for table `users`
INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'test', 'test@gmail.com', 'test');

-- Indexes for table `recipes`
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

-- Indexes for table `users`
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

-- AUTO_INCREMENT for table `recipes`
ALTER TABLE `recipes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT for table `users`
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

COMMIT;
