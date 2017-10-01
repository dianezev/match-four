package org.launchcode.matchfour.controllers;

import org.launchcode.models.Category;
import org.launchcode.models.data.CategoryDao;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@Controller
@RequestMapping("userLogin")
public class LoginController {

    @RequestMapping("")
    public String index(Model model) {

        model.addAttribute("users", users.findAll()); //replace users with user object
        model.addAttribute("", "users"); //add username here
        return "redirect:";
    }

    @RequestMapping(value = "add", method = RequestMethod.GET)
    public String add(Model model) {
        model.addAttribute("title", "user");
        model.addAttribute("user", new user());

        return "category/add";
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public String add(@ModelAttribute @Valid User user, Errors errors) {

        if (errors.hasErrors()) {
            return "/category/add";
        }

        categoryDao.save(category);
        return "redirect:";
    }
}
