pragma solidity >=0.4.22 <0.9.0;

contract Election {
    //structure to store info of candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    
    // to store which account is voted
    mapping(address => bool) public voters;
    
    mapping(uint => Candidate) public candidates;

    // tally total candidates
    uint public candidatesCount;

    //store winner
    string public electionwin;

     // voted event
    event votedEvent (
        uint indexed _candidateId
    );
    
    constructor () public {
        addCandidate("BJP : Rajesh Kumar");
        addCandidate("Congress : Saman Patel");
        addCandidate("AAP : Kiran Biswa");
    }
    
    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
    
    function winner() public view returns(string memory _name){
        uint maxc=0;
        for(uint i=1;i<=candidatesCount;i++){
            if(candidates[i].voteCount > maxc){
                maxc=candidates[i].voteCount;
                _name=candidates[i].name;
                
                //electionwin=candidates[i].name;
            }
        }
    }

}
