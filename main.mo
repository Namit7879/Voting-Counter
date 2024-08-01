import Nat "mo:base/Nat";

actor VotingBackend {
  stable var topics : [(Text, Text, Nat)] = [];

  public func createTopic(title : Text, description : Text) : async () {
    topics := Array.append(topics, [(title, description, 0)]);
  };

  public func voteForTopic(title : Text) : async () {
    topics := Array.map(topics, func ((t, d, v)) {
      if (t == title) {
        return (t, d, Nat.add(v, 1));
      } else {
        return (t, d, v);
      }
    });
  };

  public func getTopics() : async [(Text, Text, Nat)] {
    return topics;
  };
};

