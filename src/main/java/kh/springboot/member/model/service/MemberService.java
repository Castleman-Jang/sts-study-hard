package kh.springboot.member.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import kh.springboot.member.model.mapper.MemberMapper;
import kh.springboot.member.model.vo.Member;
import kh.springboot.member.model.vo.TodoList;
import lombok.RequiredArgsConstructor;

@Service // Service 역할의 bean 생성
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberMapper mapper;

	public Member login(Member m) {
		return mapper.login(m);
	}

	public int insertMember(Member m) {
		return mapper.insertMember(m);
	}

	public ArrayList<HashMap<String, Object>> selectMyList(String id) {
		return mapper.selectMyList(id);
	}

	public int updateMember(Member m) {
		return mapper.updateMember(m);
	}

	public int updatePassword(Member m) {
		return mapper.updatePassword(m);
	}

	public int deleteMember(Member m) {
		return mapper.deleteMember(m);
	}

//	public int checkId(String id) {
//		return mapper.checkId(id);
//	}
//
//	public int checkNickName(String nickName) {
//		return mapper.checkNickName(nickName);
//	}

	public int checkValue(HashMap<String, String> map) {
		return mapper.checkValue(map);
	}

//	public String findId(Member m) {
//		return mapper.findId(m);
//	}
//
//	public Member findPw(Member m) {
//		return mapper.findPw(m);
//	}

	public Member findInfo(Member m) {
		return mapper.findInfo(m);
	}

	

	public int insertTodo(TodoList todo) {
		return mapper.insertTodoList(todo);
	}

	public ArrayList<TodoList> selectTodoList(String id) {
		// TODO Auto-generated method stub
		return mapper.selectTodoList(id);
	}

	public int updateTodo(TodoList todo) {
		return mapper.updateTodo(todo);
	}

	public int updateImportant(TodoList todo) {
		// TODO Auto-generated method stub
		return mapper.updateImportant(todo);
	}

	public int deleteTodo(int todoNum) {
		// TODO Auto-generated method stub
		return mapper.deleteTodo(todoNum);
	}

	public int updateProfile(Member m) {
		// TODO Auto-generated method stub
		return mapper.updateProfile(m);
	}

	public List<Member> searchAllMembers(String id) {
		// TODO Auto-generated method stub
		return mapper.searchAllMembers(id);
	}

	public int updateMemberItem(HashMap<String, String> map) {
		// TODO Auto-generated method stub
		return mapper.updateMemberItem(map);
	}


	
}
