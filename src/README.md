# Introduction
Credit is due to Michael Salmon (21 March 2017) who supplied the Python code online which inspired this specific React implementation of the Monty Hall Problem.  The code is shared below, and can also be found at <a target="_blank" href="https://medium.com/@msalmon00/replicating-the-monty-hall-problem-through-code-a2a93bcab734">this</a> link.

```python
import numpy as np
def monty_hall_game(num_games, door_pick, keep_switch): 
    wins = 0   
    door_pick = door_pick.lower() 
    keep_switch = keep_switch.lower() 
    door_set = ["a", "b", "c"]
    for n in range(0, num_games):
        open_door_set = ["a", "b", "c"] 
        unchosen_door_set = ["a", "b", "c"] 
        unchosen_door_set.remove(door_pick) 
        win_door = np.random.choice(door_set, 1) 
        if door_pick == win_door: 
            open_door_set.remove(win_door)
        else:
            open_door_set.remove(win_door) 
            open_door_set.remove(door_pick)
        open_door = np.random.choice(open_door_set, 1) 
        unchosen_door_set.remove(open_door) 
        if keep_switch == "k": 
            if door_pick == win_door: 
                wins += 1 
        if keep_switch == "s": 
            if unchosen_door_set[0] == win_door: 
                wins += 1
 return float(wins)/float(num_games)
 ```

According to this <a href="https://simple.wikipedia.org/wiki/Monty_Hall_problem">link</a>, the Monty Hall Problem is a famous in probability.  The problem is based on a television game show from the United States, Let's Make a Deal. It is named for this show's host, Monty Hall.

In the problem, there are three doors. A prize of high value is behind one door and goats are behind the other two doors. First, the player chooses a door but does not open it. Then the host opens a different door. The host knows what is behind every door, and always chooses a door with a goat behind it. (If there are goats behind both other doors, one is chosen at random.) Last, the player choose whether to keep what is behind the first door or to change to the third door (the one the host did not open).

The rules of the problem are that the host has to open a door with a goat behind it and the player has the opportunity to switch. The question is whether changing choices increases the chances of getting the prize.

Most people feel that the prize is equally likely to be behind either of the two doors that are still closed, so that changing doors does not affect the chance of getting the prize. The true answer is that changing choices increases the chances of getting the prize from 1/3 (one out of three) to 2/3 (two out of three).

# The Application
This code was bootstrapped with `npx create-react-app`.  As such, the app will run on `localhost:3000` if one enters `npm start` from the command line terminal.

The functionality of the app is enabled based by mouse clicks; no keystrokes are needed.

`App.js` is the "main" driver of the code. It does, however, incorporate all the component functions in the components folder, the building blocks of the App.  More information is provided for these components in the comments in the `App.js` file.  You will also note that the `useReducer` hook is used to effectively manage the state of the program.

Minimalistic Styling was applied, and can be found in the `.module.css` files inside the components folder.  Inside the `assets` folder, you'll find the pictures used in this app.
