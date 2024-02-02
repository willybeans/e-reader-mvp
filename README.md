### Goal of project:

This React Native project is built with the support of this Golang RESTful API [here](https://github.com/willybeans/freedu_go). It is designed to provide users the ability to create and share language learning content with one another. Most importantly it provides a space where someone can create their own language learning content themselves. Stephen Krashens theory of language learning is the driving influence behind the design and features that have been implemented in this application

#### What problem is being solved?

- As a language learner, it is difficult to find viable content to practice reading
- Leveraging real world content in particular is often difficult because consistently translating content manually is time consuming
- It is hard to keep track of what words one is currently learning, or have learned, which robs the learner of a concrete sense of progress
- Sharing content with other people, and also using other peoples content, is often a more efficient than always having to look for content yourself. Fluent speakers can often cater their speech towards your language proficiency level easier than it is to find books that 'fit' with your level.
- Creating a social aspect behind the often solitary process of language learning helps build relationships with other language learners which foster motivation, and often dispells fears
- When making the transition from learning to speaking, it is often hard to find content/tools that eases you into that transition.

### What Stack? What is where?

- React Native application
- Uses Expo for routing, which also allows us to build for web

## Contribution Guidlines:

## Set Up:

1. Fork on github for cleanliness
2. Clone your fork locally (make sure to [pull from this parent project](https://stackoverflow.com/questions/13828230/pulling-changes-from-fork-parent-in-git) instead of your branch, otherwise you wont get the current git state)

   - `git clone git@github.com:<my-github-name>/freedu_rn.git`

3. [Setup React Native](https://reactnative.dev/docs/environment-setup?guide=native), using only expo setup instructions, you can run the app on your personal device, or you can setup your work device to run the simulator by following the react native setup instructions. Both iOs and Android have their own setup requirements.

## To Run

- If you have the expo go app installed you can simply scan the QR code, otherwise you will have to run a simulator for your target OS first.
  - in console: `npm run start` - then follow the prompts
  - in second console and code base, you will need to run the [go api](https://github.com/willybeans/freedu_go)

### Your first pull request

- Make clear your intention to work on a problem in the issue section by either:

1.  Making an issue yourself and leaving a comment of your intent to complete the issue
2.  Comment on existing issue with your intention to fix it

- All code should be compliant to the proper lint rules
- Use a branch naming convention like `fix/short-fix-description` or `feature/short-feature-description`
- Please keep all push requests concise
- _Avoid_ pushing more than one file at a time (avoid `git add .` unless you are certain it is not adding additional unrelated material)
- Always be up to date: `git pull` to avoid a merge conflict avalanche before your PR
- Push to staging branch so your commit can be tested and confirmed

#### Issues

- Pick an unassigned issue that you think you can accomplish, add a comment that you are attempting to do it.
- Feel free to propose issues that aren’t described! Get the okay that it is inline with the project goals before working.
