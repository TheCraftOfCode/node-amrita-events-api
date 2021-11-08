const { Events } = require("../models/Events");

const { Club } = require("../models/club");

const Express = require("express");
const _ = require("lodash");
const router = Express.Router();

//importing middle ware
const AuthenticateUser = require("../middleware/AuthenticateUser");
const RedirectAdminUser = require("../middleware/RedirectAdminUser");

router.get("/", AuthenticateUser, async (request, response) => {
  const Clubs = await Club.find({});
  console.log(Clubs);

  response.status(200).send(Clubs);
});

router.get(
  "/fetchEvents/:ClubName",
  AuthenticateUser,
  async (request, response) => {
    const ClubName = request.params.ClubName;
    const EventsConductedByClub = await Events.find({
      OrganizingClub: ClubName,
    });

    //for debugging purposes
    console.log(EventsConductedByClub);
    response.status(200).send(EventsConductedByClub);
  }
);

module.exports = router;
