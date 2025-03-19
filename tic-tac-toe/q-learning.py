import numpy as np
from typing import List, Optional, Tuple
import random

class TicTacToe:
    """
    A class to represent the Tic Tac Toe game.
    """
    def __init__(self) -> None:
        self.board: np.ndarray = np.zeros(9, dtype=int)  # 0: empty, 1: X, -1: O
        self.current_player: int = 1  # 1 for X, -1 for O

    def make_move(self, action: int) -> bool:
        """
        Makes a move on the board for the current player.

        Args:
            action (int): The position (0-8) to place the marker.

        Returns:
            bool: True if the move is valid, False otherwise.
        """
        if action < 0 or action >= 9:
            raise ValueError("Action must be between 0 and 8.")
        if self.board[action] == 0:
            self.board[action] = self.current_player
            self.current_player *= -1
            return True
        return False

    def get_winner(self) -> Optional[int]:
        """
        Checks if there is a winner or if the game is a draw.

        Returns:
            Optional[int]: 1 if X wins, -1 if O wins, 0 if draw, None if game is ongoing.
        """
        winning_combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
            [0, 4, 8], [2, 4, 6]             # Diagonals
        ]
        for combo in winning_combinations:
            if self.board[combo[0]] == self.board[combo[1]] == self.board[combo[2]] != 0:
                return self.board[combo[0]]  # Return 1 if X wins, -1 if O wins

        if np.all(self.board != 0):  # Check if the board is full (draw)
            return 0

        return None  # Game is still ongoing

    def get_state(self) -> Tuple[int, ...]:
        """
        Returns the current state of the board.

        Returns:
            Tuple[int, ...]: The board state as a tuple.
        """
        return tuple(self.board)

    def get_available_actions(self) -> List[int]:
        """
        Returns the list of available actions (empty positions).

        Returns:
            List[int]: List of indices where moves can be made.
        """
        return list(np.where(self.board == 0)[0])

    def reset(self) -> None:
        """
        Resets the game to the initial state.
        """
        self.board = np.zeros(9, dtype=int)
        self.current_player = 1


class QLearningAgent:
    """
    A Q-learning agent for playing Tic Tac Toe.
    """
    def __init__(self, learning_rate: float = 0.1, discount_factor: float = 0.9, exploration_rate: float = 0.1) -> None:
        self.learning_rate: float = learning_rate
        self.discount_factor: float = discount_factor
        self.exploration_rate: float = exploration_rate
        self.q_table: dict = {}  # State-action value table

    def get_q_value(self, state, action):
        if (state, action) not in self.q_table:
            self.q_table[(state, action)] = 0.0
        return self.q_table[(state, action)]

    def choose_action(self, state: Tuple[int, ...], available_actions: List[int]) -> int:
        """
        Chooses an action based on the current state and exploration strategy.

        Args:
            state (Tuple[int, ...]): The current state of the board.
            available_actions (List[int]): List of available actions.

        Returns:
            int: The chosen action.
        """
        if np.random.rand() < self.exploration_rate:
            return random.choice(available_actions)  # Explore
        return max(available_actions, key=lambda action: self.q_table.get((state, action), 0))  # Exploit

    def update_q_value(self, state: Tuple[int, ...], action: int, reward: float, next_state: Tuple[int, ...]) -> None:
        """
        Updates the Q-value for a given state-action pair.

        Args:
            state (Tuple[int, ...]): The current state.
            action (int): The action taken.
            reward (float): The reward received.
            next_state (Tuple[int, ...]): The next state after the action.
        """
        current_q = self.q_table.get((state, action), 0)
        max_next_q = max(
            [self.q_table.get((next_state, a), 0) for a in range(9)],
            default=0
        )
        self.q_table[(state, action)] = current_q + self.learning_rate * (
            reward + self.discount_factor * max_next_q - current_q
        )


def train_agent(agent: QLearningAgent, episodes: int = 10000) -> None:
    """
    Trains the Q-learning agent by playing games against itself.

    Args:
        agent (QLearningAgent): The Q-learning agent to train.
        episodes (int): Number of training episodes.
    """
    for episode in range(episodes):
        game = TicTacToe()
        previous_state = None
        previous_action = None

        while True:
            state = game.get_state()
            available_actions = game.get_available_actions()

            # Agent chooses an action
            action = agent.choose_action(state, available_actions)
            game.make_move(action)

            # Check for winner
            winner = game.get_winner()
            if winner is not None:
                reward = 1 if winner == game.current_player * -1 else -1 if winner == game.current_player else 0
                if previous_state is not None:
                    agent.update_q_value(previous_state, previous_action, reward, game.get_state())
                break

            # Update Q-value for the previous state-action pair
            if previous_state is not None:
                agent.update_q_value(previous_state, previous_action, 0, state)  # Neutral reward for ongoing game

            # Save the current state and action for the next update
            previous_state = state
            previous_action = action


def play_game_with_human(agent: QLearningAgent) -> None:
    """
    Allows a human to play a game of Tic Tac Toe against the trained Q-learning agent.

    Args:
        agent (QLearningAgent): The trained Q-learning agent.
    """
    game = TicTacToe()
    print("Welcome to Tic Tac Toe!")
    print("You are X (1), and the computer is O (-1).")

    while True:
        # Display the board
        print("\nCurrent Board:")
        print(game.board.reshape(3, 3))

        # Check for winner
        winner = game.get_winner()
        if winner is not None:
            if winner == 1:
                print("You win!")
            elif winner == -1:
                print("Computer wins!")
            else:
                print("It's a draw!")
            break

        # Player's turn
        if game.current_player == 1:
            try:
                action = int(input("Enter your move (0-8): "))
                if not game.make_move(action):
                    print("Invalid move. Try again.")
            except ValueError:
                print("Invalid input. Please enter a number between 0 and 8.")
        # Computer's turn
        else:
            state = game.get_state()
            available_actions = game.get_available_actions()

            # Display possible actions and their Q-values
            print("\nComputer's Turn:")
            print("Available actions and their Q-values:")
            for action in available_actions:
                q_value = agent.q_table.get((state, action), 0)
                print(f"Action: {action}, Q-value: {q_value}")

            # Choose and make the best action
            action = agent.choose_action(state, available_actions)
            game.make_move(action)
            print(f"Computer chose action: {action}")


if __name__ == "__main__":
    agent = QLearningAgent()

    # Train the agent
    print("Training the Q-learning agent...")
    train_agent(agent, episodes=100000)
    print("Training complete!")

    # Play a game with the human
    play_game_with_human(agent)

